import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import path from "path";
import expressFileUpload from "express-fileupload";
import YAML from "yamljs";
import { AppError } from "../../ErrorHandler/AppError";
import "../../Configs/Enviroment";
import { apiRoutes } from "../../Routes";
import { CAR_SITE_FRONTEND_URL } from "../../Configs/Enviroment/EnviromentVariables";
import { rabbitMq } from "../../Queue/RabbitMq";
class HttpServer {
  app: express.Express;
  private corsOrigins = [CAR_SITE_FRONTEND_URL, "http://localhost:3000"]
  constructor() {
    this.app = express();
    this.middlewares();
    this.defaultHeaders();
    this.routes();
    this.errorHandler();
    this.swaggerInit();
    this.queues();
    console.log("Connected to Http Server");
  }

  async queues() {
    try {
      await rabbitMq.connect();
      await rabbitMq.subscribeToQueues();
    } catch (error) {
      console.log("RABBIT MQ ERROR", error);
    }
  }

  swaggerInit() {
    const swaggerDocument = YAML.load(
      `${path.resolve()}/src/Configs/swagger.yaml`
    );
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  listen() {
    this.app.listen(5001, () => console.log("Listening to 5001"));
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(expressFileUpload());
    this.app.use(
      cors({
        origin: this.corsOrigins,
        credentials: true,
      })
    );
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/api", apiRoutes);
  }

  errorHandler() {
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({ message: err.message });
        } else {
          return res
            .status(500)
            .json({ message: `Internal Server Error ${err.message}` });
        }
      }
    );
  }

  defaultHeaders() {
    this.app.use((req, res, next) => {
      const origin = this.corsOrigins.includes(
        req.header("origin")
      )
        ? req.headers.origin
        : null;
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT"
      );
      next();
    });
  }
}

export default new HttpServer();

import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user";

@Entity("addresses")
class Addresses {
  @PrimaryColumn()
  _id?: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  latitude: number;
  
  @Column()
  longitude: number;

  @CreateDateColumn()
  created_at?: Date;


  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToOne((type) => Users, (users) => users.addresses)
  users?: Users;

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { Addresses };

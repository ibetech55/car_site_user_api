import "reflect-metadata";
import { v4 as uuid } from "uuid";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./address";
import { Dealersrhips } from "./dealership";
import { PrivateUsers } from "./privateUser";
import { Access } from "./access";

@Entity("users")
class Users {
  @PrimaryColumn()
  _id?: string;

  @Column()
  email?: string;

  @Column()
  user_type?: string;

  @Column()
  active?: boolean;

  @Column()
  address_id?: string;

  @Column()
  password?: string;

  @Column()
  phone_number?: string;

  @CreateDateColumn()
  created_at?: Date | string;

  @UpdateDateColumn()
  updated_at?: Date;

  @Column()
  account_status: string;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToOne((type) => Addresses, (addresses) => addresses)
  @JoinColumn({ name: "address_id" })
  addresses?: Addresses;

  @OneToOne((type) => Dealersrhips, (dealerships) => dealerships.users)
  dealerships?: Dealersrhips;

  @OneToOne((type) => PrivateUsers, (privateUsers) => privateUsers.users)
  privateUsers?: PrivateUsers;

  @OneToMany((type) => Access, (access) => access.users)
  access?: Access[];

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { Users };

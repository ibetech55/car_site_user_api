import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user";
import { Addresses } from "./address";

@Entity("dealerships")
class Dealersrhips {
  @PrimaryColumn()
  _id?: string;

  @Column()
  contact_name: string;

  @Column()
  dealership_name: string;

  @Column()
  dealership_logo: string;

  @Column()
  user_id?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToOne(type => Users, users => users)
  @JoinColumn({ name: 'user_id' })
  users?: Users

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { Dealersrhips };

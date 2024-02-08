import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user";

@Entity("private_users")
class PrivateUsers {
  @PrimaryColumn()
  _id?: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  date_of_birth: string;

  @Column()
  user_image?: string;

  @Column()
  user_id: string;

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

export { PrivateUsers };

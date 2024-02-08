import "reflect-metadata";
import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./user";

@Entity("access")
class Access {
  @PrimaryColumn()
  _id?: string;

  @Column()
  access_code: string;

  @Column()
  access_code_token: string;

  @Column()
  active: boolean;

  @Column()
  type: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(type => Users, users => users)
  @JoinColumn({ name: 'user_id' })
  users?: Users

  constructor() {
    if (!this._id) {
      this._id = uuid();
    }
  }
}

export { Access };

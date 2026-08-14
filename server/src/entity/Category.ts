import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", default: "#6366f1" })
  color!: string;

  @Column({ type: "varchar", nullable: true })
  icon!: string;

  @ManyToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column({ type: "varchar", nullable: true })
  userId!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions!: Transaction[];
}

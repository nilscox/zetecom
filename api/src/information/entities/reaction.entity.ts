import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Expose, Exclude, Type, Transform } from 'class-transformer';

import { labelName } from 'Utils/labels';
import { User } from 'User/entities/user.entity';
import { Information } from './information.entity';
import { Message } from './message.entity';

@Entity()
@Exclude()
export class Reaction {

  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column({ nullable: true })
  @Expose()
  quote: string;

  @Column()
  @Expose()
  @Transform(label => labelName(label))
  label: number;

  @Column()
  @Expose()
  slug: string;

  @CreateDateColumn()
  @Expose({ name: 'date' })
  @Type(() => Date)
  created: Date;

  @UpdateDateColumn()
  @Type(() => Date)
  updated: Date;

  @Expose()
  get edited(): Date | false {
    if (this.created.getTime() === this.updated.getTime())
      return false;

    return this.updated;
  }

  @Expose()
  get text(): string {
    const l = this.messages.length;

    return this.messages[l - 1].text;
  }

  @Expose()
  get history(): { date: Date, text: string }[] {
    return this.messages.slice(0, -1).map(m => ({
      date: m.created,
      text: m.text,
    }));
  }

  @ManyToOne(type => User, user => user.reactions)
  @Expose()
  author: User;

  @ManyToOne(type => Information, information => information.reactions)
  information: Information;

  @OneToMany(type => Message, message => message.reaction, { eager: true })
  messages: Message[];

  @ManyToOne(type => Reaction, reaction => reaction.answers)
  parent: Reaction;

  @OneToMany(type => Reaction, reaction => reaction.parent)
  @Expose()
  @Type(() => ReactionWithoutHistory)
  answers: Reaction[];

}

@Exclude()
export class ReactionWithoutHistory extends Reaction {
  @Exclude()
  get history() {
    return null;
  }
}

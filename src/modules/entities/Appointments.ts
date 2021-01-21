import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

//  Entity -> A classe abaixo passa a ser os parâmetros parar ser enviado para
//  o banco de dados, disponivel somente no TypeScript.

import User from './user';

/**
 *  Um para Um (OneToOne)
 *  Um para Muitos (OneToMany)
 *  Muitos para Muitos (ManyToMany)
 *
 */

@Entity('appointments')
class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  /**
   * @ManyToOne -> Muitos agendamentos para um unico usuário (relacionamento de
   * tabelas)
   * @JoinColumn -> Seta a coluna que identifica, qual o prestador do agendamento
   */
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointments;

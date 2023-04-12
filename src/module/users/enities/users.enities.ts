import { BaseEntity, Column, PrimaryGeneratedColumn , Entity, ManyToMany, JoinTable, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";
import { SessionEntity } from "src/module/auth/enities/session.entity";

@Entity({name: 'users'})
export class UsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    firstName: string;

    @Column({nullable: false})
    lastName: string;

    @Column({nullable: false})
    email: string;

    @Column({nullable: false})
    passwordHash: string;

    @OneToMany(() => SessionEntity, (session) => session.user)
    sessions: SessionEntity[]; 

    @Column({enum: AccountRoleEnum,nullable: false, default: AccountRoleEnum.User})
    role: AccountRoleEnum;
    
}
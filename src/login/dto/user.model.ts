import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt, Length } from 'sequelize-typescript';

@Table({ tableName: 'user'})
export class User extends Model {
    @Length({ min: 3, max: 50 })
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column({ defaultValue: true })
    isActive: boolean;

    @Column
    userName: string;

    @Column
    password: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column
    email: string;

    @CreatedAt
    createdOn: Date;
  
    @UpdatedAt
    updatedOn: Date;
  
    @DeletedAt
    deletedOn: Date;
}
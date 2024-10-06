import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';

@Table({ tableName: 'book'})
export class Book extends Model {
    @Column
    name: string;

    @Column
    description: string;

    @Column
    price: number;

    @CreatedAt
    createdOn: Date;
  
    @UpdatedAt
    updatedOn: Date;
  
    @DeletedAt
    deletedOn: Date;
}
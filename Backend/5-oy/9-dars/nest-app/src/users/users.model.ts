import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'foydalanuvchilar'})

export class User extends Model<User>{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string
}
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Url extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  urlCode: string;

  @Column
  longUrl: string;

  @Column
  shortUrl: string;
}

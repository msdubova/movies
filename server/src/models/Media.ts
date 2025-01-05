// models/Media.ts

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';


interface MediaAttributes {
  id: number;
  title: string;
  media_type: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
 }

class Media extends Model<MediaAttributes> implements MediaAttributes {
  public id!: number;
  public title!: string;
  public media_type!: string;
  public release_date!: string;
  public poster_path!: string;
  public vote_average!: number;
}

Media.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    media_type: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    vote_average: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: 'Media',
    tableName: 'media', // Adjust the table name if necessary
    timestamps: false, // Disable timestamps
  }
);

export default Media;

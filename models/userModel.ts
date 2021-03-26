import { Model, Optional } from "sequelize";
import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize";

interface UserAttributes {
  name: string;
  phoneNumber: string;
  id: string;
}
class User extends Model<UserAttributes> {}
User.init({
  name: DataTypes.STRING,
  phoneNumber: DataTypes.STRING,
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
},{
  sequelize,
  modelName: "User"
});

interface TokenAttributes {
  token : string;
  UserId?:string;
}

class Tokens extends Model<TokenAttributes> {}

Tokens.init({
token: {
  type: DataTypes.STRING,
  primaryKey: true
},
UserId: {
  type: DataTypes.STRING
}
},{
  modelName:"Token",
  sequelize
});

User.hasMany(Tokens)

export { User,Tokens };

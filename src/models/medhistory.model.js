import { DataTypes } from "sequelize";
import db from "./../dataBase/initDb.js";

const MedHistory = db.define("medhistory", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  dor: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "patients",
      key: "id",
    },
  },
});

const MedReport = db.define("medreport", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  report_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dor: {
    type: DataTypes.DATE,
    allowNull: false,
  },
    medhistory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medhistories',
            key: 'id'
        }
    }
});

MedHistory.hasMany(MedReport, {
    foreignKey: 'medhistory_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export { MedHistory, MedReport };

import mongoose from "mongoose";
import tableModels from "../models/table";
import { readFileSync } from "fs";

let tableData: any = readFileSync(__dirname + "/allTables.json");
tableData = JSON.parse(tableData).tables;

let allTables: any[] = [];
tableData.forEach((table: any) => {
  allTables.push(new tableModels(table));
});

export default allTables;
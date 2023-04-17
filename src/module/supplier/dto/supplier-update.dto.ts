import { PartialType } from "@nestjs/mapped-types";
import { SupplierCreateDto } from "./create-supplier.dto";

export class SupplierUpdateDto extends PartialType(SupplierCreateDto){}
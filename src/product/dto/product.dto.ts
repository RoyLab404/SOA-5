import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ProductDto {
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @MaxLength(255, { message: 'Tên sản phẩm tối đa 255 ký tự' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Danh mục phải là chuỗi' })
  @MaxLength(100, { message: 'Danh mục tối đa 100 ký tự' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Giá sản phẩm phải là số hợp lệ' })
  @Min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0' })
  price: number;

  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity: number;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @MaxLength(255, { message: 'Tên sản phẩm tối đa 255 ký tự' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Danh mục phải là chuỗi' })
  @MaxLength(100, { message: 'Danh mục tối đa 100 ký tự' })
  category?: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi' })
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Giá sản phẩm phải là số hợp lệ' })
  @Min(0, { message: 'Giá sản phẩm phải lớn hơn hoặc bằng 0' })
  price?: number;

  @IsOptional()
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity?: number;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(search?: string, category?: string): Promise<Product[]> {
    const whereCondition: any = {};

    if (category) {
      whereCondition.category = category;
    }

    if (search) {
      whereCondition.name = Like(`%${search}%`);
    }

    return this.productRepository.find({
      where: Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm với ID ${id}`);
    }
    return product;
  }

  async create(dto: ProductDto): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...dto,
      category: dto.category || 'Phụ kiện',
    });
    return this.productRepository.save(newProduct);
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string; deletedId: number }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return {
      message: `Đã xóa sản phẩm "${product.name}" thành công`,
      deletedId: id,
    };
  }
}

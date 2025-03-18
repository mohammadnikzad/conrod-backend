import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'common/dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'common/util/common.constants';
import { OrderItemDto } from './dto/order-item.dto';
import { Product } from 'products/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    const itemsWithPrice = await Promise.all(
      items.map((item) => this.createOrderItemWithPrice(item)),
    );

    const order = this.ordersRepository.create({
      ...createOrderDto,
      items: itemsWithPrice,
    });
    return this.ordersRepository.save(order);
  }

  findAll(paginationDto: PaginationDto) {
    const { limit, offset } = paginationDto;
    return this.ordersRepository.find({
      skip: offset,
      take: limit ?? DEFAULT_PAGE_SIZE.USER,
    });
  }

  async findOne(id: number) {
    const product = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        items: {
          product: true,
        },
        customer: true,
        payment: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Order not found!');
    }

    return product;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }

  private async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { id } = orderItemDto.product;

    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const { price } = product;

    const orderItem = this.orderItemsRepository.create({
      ...orderItemDto,
      price,
    });

    return orderItem;
  }
}

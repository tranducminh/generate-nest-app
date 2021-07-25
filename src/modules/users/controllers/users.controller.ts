import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserFilterDto } from '../dtos/user-filter.dto';
import { generateEmptyRes, ResponseDto } from '@common/dtos/response.dto';
import { IUsersController } from '../interfaces/users.controller.interface';

@Controller('users')
export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto
  ): Promise<ResponseDto<UserDto>> {
    const user = await this.usersService.create(createUserDto);

    return user.toResponse(HttpStatus.CREATED, 'Create user successfully');
  }

  @Get()
  async findAll(
    @Query() filter: UserFilterDto
  ): Promise<ResponseDto<UserDto[]>> {
    const users = await this.usersService.findAll(filter);

    return users.toResponse();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseDto<UserDto>> {
    const user = await this.usersService.findOne(id);

    return user.toResponse();
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseDto<null>> {
    await this.usersService.update(id, updateUserDto);

    return generateEmptyRes(HttpStatus.OK, `Update user #${id} successfully`);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseDto<null>> {
    await this.usersService.remove(id);

    return generateEmptyRes(HttpStatus.OK, `Delete user #${id} successfully`);
  }
}

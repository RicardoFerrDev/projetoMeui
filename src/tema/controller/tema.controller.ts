import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Tema } from "../entities/tema.entity";
import { TemaServices } from "../service/tema.service";
@ApiTags('Tema')
@UseGuards(JwtAuthGuard)
@Controller(`/tema`)
@ApiBearerAuth()
export class TemaController{
   constructor(private readonly temaServices: TemaServices){}

   @Get(`/:id`)
   @HttpCode(HttpStatus.OK)
   findById(@Param(`id`,ParseIntPipe) id: number): Promise <Tema>{
      return this.temaServices.findById(id)
   }
   @Get()
   @HttpCode(HttpStatus.OK)
   findAll(): Promise<Tema[]> {
       return this.temaServices.findAll()
   }

   @Get('categoria/:categoria')
   @HttpCode(HttpStatus.OK)
   findByCategoria(@Param('categoria') categoria: string): Promise<Tema[]> {
       return this.temaServices.findByCategoria(categoria)
   }
   @Get('filtro/:filtro')
   @HttpCode(HttpStatus.OK)
   findByFiltro(@Param('filtro') filtro: string): Promise<Tema[]> {
       return this.temaServices.findByFiltro(filtro)
   }
   @Post()
   @HttpCode(HttpStatus.CREATED)
   create(@Body() tema: Tema): Promise<Tema> {
       return this.temaServices.create(tema)
   }
   @Put()
   @HttpCode(HttpStatus.OK)
   update(@Body() tema: Tema): Promise<Tema> {
       return this.temaServices.update(tema)
   }

   
   @Delete('/:id')
   @HttpCode(HttpStatus.NO_CONTENT)
   delete(@Param('id', ParseIntPipe) id: number) {
     return this.temaServices.delete(id)
}
}
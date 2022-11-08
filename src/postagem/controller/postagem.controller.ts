import { Body, Controller,Delete,Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { PostagemServices } from "../service/postagem.service";
import { PostagemEntity } from "../entities/postagem.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
@ApiTags('Postagem')
@UseGuards(JwtAuthGuard)
@Controller(`/postagens`)
@ApiBearerAuth()
export class PostagemController{
    constructor(private readonly postagemService: PostagemServices){}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise< PostagemEntity[] > {
        return this.postagemService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)id: number): Promise<PostagemEntity>{
    return this.postagemService.findById(id)
    }
    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTitulo(@Param('titulo')titulo: string):Promise<PostagemEntity[]>{
        return this.postagemService.findByTitulo(titulo)
    }
    @Get('/conteudo/:conteudo')
    @HttpCode(HttpStatus.OK)
    findByConteudo(@Param('conteudo')conteudo: string):Promise<PostagemEntity[]>{
        return this.postagemService.findByConteudo(conteudo)
    }
    @Get('/imagem/:imagem')
    @HttpCode(HttpStatus.OK)
    findByImagem(@Param('imagem')imagem: string):Promise<PostagemEntity[]>{
        return this.postagemService.findByImagem(imagem)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() postagem: PostagemEntity):Promise<PostagemEntity>{
        return this.postagemService.create(postagem)
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() postagem:PostagemEntity):Promise<PostagemEntity>{
        return this.postagemService.update(postagem)
    }

    @Delete(`/:id`)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param(`id`,ParseIntPipe) id:number ){
        return this.postagemService.delete(id)
    }
}
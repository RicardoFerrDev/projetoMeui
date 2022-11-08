import { Body, Controller,Delete,Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { UsuarioEntity } from "../entities/usuario.entity";
import { UsuarioServices } from "../service/usuario.service";
@ApiTags('Usuario')
@UseGuards(JwtAuthGuard)
@Controller(`/usuario`)
@ApiBearerAuth()
export class UsuarioController{
    constructor(private readonly usuarioservice: UsuarioServices){}
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise< UsuarioEntity[] > {
        return this.usuarioservice.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id',ParseIntPipe)id: number): Promise<UsuarioEntity>{
    return this.usuarioservice.findById(id)
    }
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome')nome: string):Promise<UsuarioEntity[]>{
        return this.usuarioservice.findByNome(nome)
    }
    @Get('/usuario/:usuario')
    @HttpCode(HttpStatus.OK)
    findByUsuario(@Param('usuario')usuario: string):Promise<UsuarioEntity>{
        return this.usuarioservice.findByUsuario(usuario)
    }
    // @Get('/senha/:senha')
    // @HttpCode(HttpStatus.OK)
    // findBySenha(@Param('senha')senha: string):Promise<UsuarioEntity[]>{
    //     return this.usuarioservice.findBySenha(senha)
    // }
    @Get('/foto/:foto')
    @HttpCode(HttpStatus.OK)
    findByFoto(@Param('foto')foto: string):Promise<UsuarioEntity[]>{
        return this.usuarioservice.findByFoto(foto)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() usuario: UsuarioEntity):Promise<UsuarioEntity>{
        return this.usuarioservice.create(usuario)
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() usuario:UsuarioEntity):Promise<UsuarioEntity>{
        return this.usuarioservice.update(usuario)
    }

    @Delete(`/:id`)
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param(`id`,ParseIntPipe) id:number ){
        return this.usuarioservice.delete(id)
    }
}
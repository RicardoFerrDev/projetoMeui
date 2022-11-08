import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { UsuarioEntity } from "../entities/usuario.entity";



@Injectable()
 export class UsuarioServices{
    constructor(
        @InjectRepository(UsuarioEntity)
        private UsuarioRepository: Repository<UsuarioEntity>,
        private bcrypt: Bcrypt
        
    ){}

    

    async findAll(): Promise<UsuarioEntity[]>{
       return await this.UsuarioRepository.find({ 
         relations: {
            postagem: true
        }  
    })
    }
    async findById(id: number): Promise<UsuarioEntity> {
        let usuario = await this.UsuarioRepository.findOne({
           where:{
            id
        }, relations: {
            postagem: true
        }

        })
        if (!usuario)
        throw new HttpException('Usuario nao encontrado',HttpStatus.NOT_FOUND)
        return usuario
    }
    async findByNome(nome: string):Promise<UsuarioEntity[]>{
        return await this.UsuarioRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            }, relations: {
                postagem: true
            }
        })
    }
    async findByUsuario(usuario: string):Promise<UsuarioEntity | undefined >{
       
       return await this.UsuarioRepository.findOne({
            where:{
                usuario: usuario
            }, relations: {
                postagem: true
            }
        })
         
    }
    async findBySenha(senha: string):Promise<UsuarioEntity[]>{
        return await this.UsuarioRepository.find({
            where:{
                senha: ILike(`%${senha}%`)
            }, relations: {
                postagem: true
            }
        })
    }
    async findByFoto(foto: string):Promise<UsuarioEntity[]>{
        return await this.UsuarioRepository.find({
            where:{
                foto: ILike(`%${foto}%`)
            }, relations: {
                postagem: true
            }
        })
    }
    async create(usuario: UsuarioEntity):Promise<UsuarioEntity>{
        let buscarUsuario = await this.findByUsuario(usuario.usuario)

        if(!buscarUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.UsuarioRepository.save(usuario)
        }
        throw new HttpException('O usuario já está cadastrado', HttpStatus.BAD_REQUEST)
    }
    async update(usuario: UsuarioEntity): Promise<UsuarioEntity>{
        let buscarUsuario= await this.findById(usuario.id)

        if(!buscarUsuario || !usuario.id)
        throw new HttpException(`UsuarioEntity nao foi encontrado`,HttpStatus.NOT_FOUND)

        return await this.UsuarioRepository.save(usuario)
    }
    async delete(id: number): Promise<DeleteResult> {
        let buscarUsuario = await this.findById(id)

        if(!buscarUsuario)
            throw new HttpException('Usuario  não encontrado', HttpStatus.NOT_FOUND)

        return await this.UsuarioRepository.delete(id)
    }
 }
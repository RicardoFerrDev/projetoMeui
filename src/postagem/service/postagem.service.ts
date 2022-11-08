import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { PostagemEntity } from "../entities/postagem.entity";


@Injectable()
 export class PostagemServices{

    constructor(
        @InjectRepository(PostagemEntity)
        private PostagemRepository: Repository<PostagemEntity>
    ){}
    async findAll(): Promise<PostagemEntity[]>{
       return await this.PostagemRepository.find({   
    })
    }
    async findById(id: number): Promise<PostagemEntity> {
        let postagem = await this.PostagemRepository.findOne({
           where:{
            id
        } 
        })
        if (!postagem)
        throw new HttpException(`PostagemEntity nao encontrado`,HttpStatus.NOT_FOUND)
        return postagem
    }
    async findByTitulo(titulo: string):Promise<PostagemEntity[]>{
        return await this.PostagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            }
        })
    }
    async findByConteudo(conteudo: string):Promise<PostagemEntity[]>{
       
        let pconteudo= await this.PostagemRepository.find({
            where:{
                conteudo: ILike(`%${conteudo}%`)
            }
        })
       if(!pconteudo ){
            throw new HttpException(`conteudo nao encontrado`,HttpStatus.NOT_FOUND)
        }
       return pconteudo
         
    }
    async findByImagem(imagem: string):Promise<PostagemEntity[]>{
        return await this.PostagemRepository.find({
            where:{
                imagem: ILike(`%${imagem}%`)
            }
        })
    }
    async create(postagem: PostagemEntity):Promise<PostagemEntity>{
       return await this.PostagemRepository.save(postagem)
    }
    async update(postagem: PostagemEntity): Promise<PostagemEntity>{
        let buscarPostagem= await this.findById(postagem.id)

        if(!buscarPostagem || !postagem.id)
        throw new HttpException(`PostagemEntity nao foi encontrado`,HttpStatus.NOT_FOUND)

        return await this.PostagemRepository.save(postagem)
    }
    async delete(id: number): Promise<DeleteResult> {
        let buscarPostagem = await this.findById(id)

        if(!buscarPostagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND)

        return await this.PostagemRepository.delete(id)
    }
 }
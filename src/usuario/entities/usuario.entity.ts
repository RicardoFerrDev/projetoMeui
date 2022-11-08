import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostagemEntity } from "../../postagem/entities/postagem.entity";

@Entity({name:"tb_usuario"})
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    nome: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    usuario: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    senha: string
    
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    foto: string

    @ApiProperty({type: () => PostagemEntity})
    @OneToMany(() => PostagemEntity, (Postagem) => Postagem.usuario)
    postagem: PostagemEntity[]
}
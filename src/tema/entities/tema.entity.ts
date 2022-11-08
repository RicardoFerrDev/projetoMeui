import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostagemEntity } from "../../postagem/entities/postagem.entity";

@Entity({name:"tb_tema"})
export class Tema{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @MaxLength(150)
    @IsNotEmpty()
    @ApiProperty()
    @Column({length: 150, nullable: false})
    categoria: string

    @MaxLength(150)
    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 150})
    filtro: string

    @ApiProperty({type: () => PostagemEntity})
    @OneToMany(() => PostagemEntity, (Postagem) => Postagem.tema)
    postagem: PostagemEntity[]
}
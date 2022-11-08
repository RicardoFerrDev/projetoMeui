import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn,Column ,UpdateDateColumn, ManyToOne  } from "typeorm";
import { Tema } from "../../tema/entities/tema.entity";
import { UsuarioEntity } from "../../usuario/entities/usuario.entity";

@Entity ({name: "tb_postagem"})
  export class PostagemEntity{
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    titulo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    conteudo: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    @ApiProperty()
    imagem: string
   
    @ApiProperty({type: () => Tema})
    @ManyToOne(() => Tema, (tema) => tema.id, {
      onDelete: "CASCADE"
  })
  tema: Tema[]
  @ApiProperty({type: () => UsuarioEntity})
  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, {
    onDelete: "CASCADE"
})
usuario: UsuarioEntity[]



}

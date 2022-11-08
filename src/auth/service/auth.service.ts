import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioServices } from "../../usuario/service/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";


//injetar essa dependência em outros locais
@Injectable()
export class AuthService {  
  constructor(
    private usuarioService: UsuarioServices, 
    private jwtService: JwtService, 
    private bcrypt: Bcrypt
  ){}


  async validarUsuario(username: string, password:string): Promise<any>{
  const buscarUsuario = await this.usuarioService.findByUsuario(username)

  if(!buscarUsuario)
  throw new HttpException ('Usuário não encontrado!', HttpStatus.NOT_FOUND)

  const match = await this.bcrypt.compararSenha(buscarUsuario.senha, password)
  
  if(buscarUsuario && match) {
    const {senha, ...result} = buscarUsuario
    return result
}
return null
}

async login(usuarioLogin: any) {
    const payload = {username: usuarioLogin.usuario, sub: "db_projeto_meui"}
    return {
        usuario:usuarioLogin.usuario,
        token:`Bearer ${this.jwtService.sign(payload)}`
    }
}

}
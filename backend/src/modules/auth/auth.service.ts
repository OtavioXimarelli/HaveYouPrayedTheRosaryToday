import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
    });

    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalCheckIns: user.totalCheckIns,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const payload = { sub: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        totalCheckIns: user.totalCheckIns,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      return user;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

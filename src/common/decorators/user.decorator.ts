import { createParamDecorator } from "@nestjs/common/decorators/http/create-route-param-metadata.decorator";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { AuthUser } from "@Interfaces/auth-user.interface";

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);
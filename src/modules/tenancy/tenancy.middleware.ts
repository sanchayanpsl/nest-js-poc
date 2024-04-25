import { NextFunction, Request, Response } from "express";

export function tenancyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const header = req.headers["tenant_header"] as string;
  req.tenantId = header?.toString() || null;
  next();
}

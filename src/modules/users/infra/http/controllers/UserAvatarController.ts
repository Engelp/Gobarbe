import { Request, Response } from 'express';
// index, show, create, update, delete
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { container } from 'tsyringe';

export default class UserAvatarControler {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    return res.json(user);
  }
}

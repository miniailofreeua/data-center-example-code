import { Connection } from 'typeorm';
import { UserEntity } from '../users.entity';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { validateUserDesksPayload } from './validateUserDesksPayload';
import { UserDeskEntity } from 'src/modules/userDesks/userDesks.entity';

export const cascadeUpdateUserDesks = async (
  user: UserEntity,
  payload: PartialUpdateUserDto,
  connection: Connection,
  _userDesksRepository,
) => {
  const { id: userId, userDesks } = user;
  validateUserDesksPayload(payload.userDesks, payload.role);

  const userDeskIdsToRemoveFromDb = [];
  const userDesksToCreate = [];
  payload.userDesks.forEach((userDesk) => {
    const { deskId } = userDesk;
    const isExist = userDesks.find((ud) => deskId === ud.deskId);
    if (!isExist && deskId) {
      userDesksToCreate.push({
        deskId,
        userId,
      });
    }
  });
  userDesks.forEach((userDesk) => {
    const isToDeleted = !payload.userDesks.some(
      (ud) => userDesk.deskId === ud.deskId,
    );
    if (isToDeleted) {
      userDeskIdsToRemoveFromDb.push(userDesk);
    }
  });
  if (userDeskIdsToRemoveFromDb.length > 0) {
    const res = await _userDesksRepository.delete(userDeskIdsToRemoveFromDb);
  }

  const queryRunner = connection.createQueryRunner();
  await queryRunner.manager.insert(UserDeskEntity, userDesksToCreate);
};

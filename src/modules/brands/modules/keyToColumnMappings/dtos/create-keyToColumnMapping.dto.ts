import { IsNotEmpty, IsString } from 'class-validator';
import { IKeyToColumnMapping } from '../interfaces/keyToColumnMapping.interface';

class CreateKeyToColumnMappingDto implements IKeyToColumnMapping {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  columnName: string;
}

export { CreateKeyToColumnMappingDto };

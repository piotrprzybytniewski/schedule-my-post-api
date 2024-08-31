import { BaseEntity } from './entity.base';

export interface Mapper<DomainEntity extends BaseEntity<any>, DbModel> {
  toDomain(dbModel: DbModel): DomainEntity;
  toPersistence(domainModel: DomainEntity): DbModel;
}

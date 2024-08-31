export interface RepositoryPort<Entity> {
  findAll(): Promise<Entity[]>;
  findOneById(id: string): Promise<Entity | null>;
  save(entity: Entity): Promise<void>;
}

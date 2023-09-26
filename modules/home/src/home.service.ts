import { HomeRepository } from './home.repository';

export class HomeService {
  private readonly homeRepository: HomeRepository = new HomeRepository();
  async getData(): Promise<any[]> {
    return await this.homeRepository.getUsers();
  }
}

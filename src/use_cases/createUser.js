// src/use_cases/createUser.js
export class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        return await this.userRepository.createUser(userData);
    }
}

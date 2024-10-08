import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';


@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,  // Inject Repository untuk Contract
  ) {}

  // Membuat kontrak baru
  async create(createContractDto: CreateContractDto): Promise<{ message: string; contract: Contract }> {
    const { otr, downPayment, durationInMonths } = createContractDto;

    // Menghitung pokok utang dan suku bunga berdasarkan durasi
    const principalDebt = otr - downPayment;
    const interestRate = this.calculateInterestRate(durationInMonths);

    // Menghitung angsuran per bulan
    const monthlyInstallment = this.calculateMonthlyInstallment(principalDebt, interestRate, durationInMonths);

    const contract = this.contractRepository.create({
      ...createContractDto,
      principalDebt,
      interestRate,
      monthlyInstallment,
    });

    const savedContract = await this.contractRepository.save(contract);

    return {
      message: 'Contract has been successfully created.',
      contract: savedContract,
    };
  }

  // Mendapatkan semua kontrak
  async findAll(): Promise<{ message: string; contracts: Contract[] }> {
    const contracts = await this.contractRepository.find();
    return {
      message: 'All contracts have been retrieved.',
      contracts,
    };
  }

  // Mendapatkan kontrak berdasarkan ID
  async findOne(id: number): Promise<Contract> {
    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    return contract; // Hanya mengembalikan entity Contract
  }


  // Update kontrak berdasarkan ID
  async update(id: number, updateContractDto: UpdateContractDto): Promise<{ message: string; contract: Contract }> {
    const contract = await this.findOne(id); // Pastikan kontrak ada sebelum di-update

    const updatedContract = {
      ...contract,
      ...updateContractDto,
    };

    const savedContract = await this.contractRepository.save(updatedContract);

    return {
      message: `Contract with ID ${id} has been successfully updated.`,
      contract: savedContract,
    };
  }

  // Hapus kontrak berdasarkan ID
  async remove(id: number): Promise<{ message: string }> {
    const contract = await this.findOne(id); // Pastikan kontrak ada sebelum dihapus
    await this.contractRepository.remove(contract); // Hapus kontrak yang ditemukan
    
    return {
      message: `Contract with ID ${id} has been successfully removed.`, // Mengembalikan pesan sukses
    };
  }

  // Fungsi tambahan: Menghitung suku bunga berdasarkan durasi
  private calculateInterestRate(durationInMonths: number): number {
    if (durationInMonths <= 12) {
      return 0.12; // 12% bunga
    } else if (durationInMonths <= 24) {
      return 0.14; // 14% bunga
    } else {
      return 0.165; // 16.5% bunga
    }
  }

  // Fungsi tambahan: Menghitung angsuran per bulan
  private calculateMonthlyInstallment(principalDebt: number, interestRate: number, durationInMonths: number): number {
    return (principalDebt + (principalDebt * interestRate)) / durationInMonths;
  }
}

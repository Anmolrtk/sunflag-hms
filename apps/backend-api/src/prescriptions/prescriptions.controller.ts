import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  create(@Body() createPrescriptionDto: any) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  findAll() {
    return this.prescriptionsService.findAll();
  }

    @Get(':id')
      findOne(@Param('id') id: string) {
        console.log("Fetching Prescription ID:", id); // <--- For debugging
        return this.prescriptionsService.findOne(id);
  }
}

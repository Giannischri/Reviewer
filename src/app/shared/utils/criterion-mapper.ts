// criterion-mapper.ts

import {
  CriterionDto,
  CriterionCreateDto,
  CriterionUpdateDto
} from '../models/criteriondto';

import { Criterion } from '../models/criterion';

// --- DTO → Model ---
export function mapCriterionDtoToModel(dto: CriterionDto): Criterion {
  return {
    id: dto.criterion_id,
    name: dto.criterion_name,
    description: dto.criterion_description,
    postId: dto.post_id,
    parentId: dto.parent_id,
    range: dto.value_range,
    important: dto.is_important,
    subjective: dto.is_subjective,
    weight: dto.weight_value,
    path: dto.path_elements
  };
}

// --- Model → Create DTO ---
export function mapCriterionToCreateDto(model: Partial<Criterion>): CriterionCreateDto {
  return {
    name: model.name!,
    description: model.description!,
    postId: model.postId!,
    parentId: model.parentId ?? null,
    range: model.range!,
    important: model.important!,
    subjective: model.subjective!,
    weight: model.weight!
  };
}

// --- Model → Update DTO ---
export function mapCriterionToUpdateDto(model: Partial<Criterion>): CriterionUpdateDto {
  const dto: CriterionUpdateDto = {};

  if (model.name !== undefined) dto.name = model.name;
  if (model.description !== undefined) dto.description = model.description;
  if (model.range !== undefined) dto.range = model.range;
  if (model.important !== undefined) dto.important = model.important;
  if (model.subjective !== undefined) dto.subjective = model.subjective;
  if (model.weight !== undefined) dto.weight = model.weight;

  return dto;
}

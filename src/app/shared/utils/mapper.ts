// // import { UserDto, UserUpdateDto } from '../models/userdto';
// import { User } from  '../models/user';
//
// import { PostDto, PostCreateDto, PostUpdateDto } from '../models/postdto';
// import { Post } from '../models/post';
//
// import { CriterionDto, CriterionCreateDto, CriterionUpdateDto } from '../models/criteriondto';
// import { Criterion } from '../models/criterion';
//
// // --- User Mappers ---
//
// export function mapUserDtoToModel(dto: UserDto): User {
//   const isAdmin = dto.roleNames.includes('ADMIN');
//   const isEditor = dto.roleNames.includes('EDITOR');
//   const isViewer = dto.roleNames.includes('VIEWER');
//
//   return {
//     id: dto.id,
//     firstName: dto.firstName,
//     lastName: dto.lastName,
//     email: dto.emailAddress, // Mapping `emailAddress` from DTO to `email` in Model
//     isActive: dto.isActive,
//     isAdmin: isAdmin,
//     isEditor: isEditor,
//     isViewer: isViewer,
//     registrationDate: new Date(dto.createdAt),
//     lastLoginDate: dto.lastLogin ? new Date(dto.lastLogin) : null,
//     fullName: `${dto.firstName} ${dto.lastName}` // Computed property
//   };
// }
//
// // For updating a user (Model to DTO)
// export function mapUserToUpdateDto(model: Partial<User>): UserUpdateDto {
//   const roleNames: string[] = [];
//   if (model.isAdmin) roleNames.push('ADMIN');
//   if (model.isEditor) roleNames.push('EDITOR');
//   if (model.isViewer) roleNames.push('VIEWER');
//   // Add other roles if needed
//
//   return {
//     firstName: model.firstName,
//     lastName: model.lastName,
//     isActive: model.isActive,
//     roleNames: roleNames.length > 0 ? roleNames : undefined // Only include if roles are present
//   };
// }
//
//
// // --- Post Mappers ---
//
// export function mapPostDtoToModel(dto: PostDto): Post {
//   return {
//     id: dto.postId, // Mapping `postId` from DTO to `id` in Model
//     title: dto.title,
//     content: dto.content,
//     authorId: dto.authorId,
//     publishedDate: new Date(dto.publishedAt),
//     tags: dto.tags,
//     isPublished: dto.status === 'PUBLISHED', // Frontend flag
//     displayStatus: dto.status.charAt(0) + dto.status.slice(1).toLowerCase() // e.g., "Draft", "Published"
//   };
// }
//
// // For creating a post (Model to DTO)
// export function mapPostToCreateDto(model: Partial<Post>): PostCreateDto {
//   return {
//     title: model.title!, // Use '!' if you're sure it will be there or handle undefined
//     content: model.content!,
//     tags: model.tags
//   };
// }
//
// // For updating a post (Model to DTO)
// export function mapPostToUpdateDto(model: Partial<Post>): PostUpdateDto {
//   // Map frontend's isPublished back to backend's status string
//   const status = model.isPublished !== undefined
//     ? (model.isPublished ? 'PUBLISHED' : 'DRAFT')
//     : undefined;
//
//   return {
//     title: model.title,
//     content: model.content,
//     tags: model.tags,
//     status: status
//   };
// }
//
//
// // --- Criterion Mappers ---
//
// export function mapCriterionDtoToModel(dto: CriterionDto): Criterion {
//   return {
//     id: dto.criterionId, // Mapping `criterionId` from DTO to `id` in Model
//     name: dto.name,
//     description: dto.description,
//     weight: dto.weight,
//     category: dto.category.charAt(0) + dto.category.slice(1).toLowerCase(), // e.g., "Performance"
//     isActive: dto.isActive,
//     displayWeight: `${(dto.weight * 100).toFixed(0)}%` // Computed property, e.g., "80%"
//   };
// }
//
// // For creating a criterion (Model to DTO)
// export function mapCriterionToCreateDto(model: Partial<Criterion>): CriterionCreateDto {
//   return {
//     name: model.name!,
//     description: model.description!,
//     weight: model.weight!,
//     category: model.category!.toUpperCase() as 'PERFORMANCE' | 'QUALITY' | 'USABILITY' // Ensure category matches DTO enum
//   };
// }
//
// // For updating a criterion (Model to DTO)
// export function mapCriterionToUpdateDto(model: Partial<Criterion>): CriterionUpdateDto {
//   return {
//     name: model.name,
//     description: model.description,
//     weight: model.weight,
//     category: model.category ? model.category.toUpperCase() as 'PERFORMANCE' | 'QUALITY' | 'USABILITY' : undefined,
//     isActive: model.isActive
//   };
// }

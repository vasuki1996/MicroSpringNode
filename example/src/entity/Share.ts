import {
	Entity,
	Column,
	BaseEntity,
	Tree,
	TreeChildren,
	TreeParent,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'share' })
@Tree('closure-table')
export class Share extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	public share_id: string;

	@Column({ nullable: true })
	public device_id: string;

	@Column({ nullable: true })
	public share_name: string;

	@TreeChildren()
	children: Share[];

	@TreeParent()
	parent: Share;

}
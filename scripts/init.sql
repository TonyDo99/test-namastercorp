create table tb_booking {
  "id" int not null primary key auto_increment,
  "final_destination" varchar(255) not null,
  "requested_ip" binary(32) not null,
  "created_at" timestamp default (current_timestamp),
  "updated_at" timestamp default (current_timestamp),
  "deleted_at" timestamp
}
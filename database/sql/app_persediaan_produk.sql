SELECT * FROM purwadhika_project_akhir.app_persediaan_produk;

insert into app_persediaan_produk (id_master_produk, id_warehouse, stok, created_at, updated_at) 
values 
(1,  1, 10, now(), now()),
(1,  2, 5, now(), now()),
(1,  3, 8, now(), now()),
(2,  1, 6, now(), now()),
(2,  2, 3, now(), now()),
(2,  3, 5, now(), now()),
(3,  1, 21, now(), now()),
(3,  2, 8, now(), now()),
(3,  3, 7, now(), now()),
(4,  1, 7, now(), now()),
(4,  2, 6, now(), now()),
(4,  3, 10, now(), now()),
(5,  1, 5, now(), now()),
(5,  2, 12, now(), now()),
(5,  3, 9, now(), now()),
(6,  1, 15, now(), now()),
(6,  2, 7, now(), now()),
(6,  3, 9, now(), now());
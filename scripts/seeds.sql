USE disaster_db;
INSERT INTO Users(firstName, middleName, lastName, address, phoneNumber, email, password, isAdmin) VALUES
('David', 'H.', 'Tran', '1234 Fake St.', '832-222-2340', 'dhtran@hotmail.com' , 'tran', true),
('Brian', '', 'Phan', '5678 Fake St.', '832-111-2340', 'phanbrian@yahoo.com' , 'phan', false),
('Andrew', '', 'Duong', '9012 Fake St.', '832-333-2340', 'duongandrew@gmail.com' , 'duong', false),
('Melinh', '', 'Mai', '3456 Fake St.', '832-444-2340', 'maimelinh@live.com' , 'mai', false);

INSERT INTO MapMessages(message, location, UserId) VALUES 
('Help', '29.729579, -95.548521', 3),
('Flooding', '29.729579, -95.548521', 1)
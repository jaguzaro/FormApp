CREATE DATABASE FormApp
GO

USE FormApp
GO

CREATE TABLE Users (
                       id INT IDENTITY(1,1) PRIMARY KEY,
                       username NVARCHAR(15) NOT NULL UNIQUE,
                       password NVARCHAR(100) NOT NULL,
                       email NVARCHAR(20) NOT NULL,
                       rol NVARCHAR(10) CHECK (rol IN ('ADMIN', 'USER'))
);

CREATE TABLE Surveys (
                         id INT IDENTITY(1,1) PRIMARY KEY,
                         name NVARCHAR(255) NOT NULL,
                         description NVARCHAR(MAX),
                         creator_user INT NOT NULL,
                         updated_user INT,
                         date_created DATETIME DEFAULT GETDATE(),
                         date_updated DATETIME,
                         enabled INT NOT NULL DEFAULT 0,
                         CONSTRAINT FK_Surveys_Users FOREIGN KEY (creator_user) REFERENCES Users (id),
                         CONSTRAINT FK_Surveys_Users_Updated FOREIGN KEY (updated_user) REFERENCES Users (id)
);


CREATE TABLE Fields (
                        id INT IDENTITY(1,1) PRIMARY KEY,
                        survey_id INT NOT NULL,
                        name NVARCHAR(255) NOT NULL,
                        type NVARCHAR(50) CHECK (type IN ('Number', 'Text', 'Date', 'MultipleChoice', 'SingleChoice')),
                        is_required INT NOT NULL DEFAULT 0,
                        CONSTRAINT FK_SurveyFields_Surveys FOREIGN KEY (survey_id) REFERENCES Surveys (id) ON DELETE CASCADE
);
CREATE INDEX IDX_Fields_SurveyID ON Fields (survey_id);

CREATE TABLE Answers (
                         id INT IDENTITY(1,1) PRIMARY KEY,
                         field_id INT NOT NULL,
                         response NVARCHAR(255) NOT NULL,
                         CONSTRAINT FK_SurveyAnswers_Surveys FOREIGN KEY (field_id) REFERENCES Fields (id) ON DELETE CASCADE
);

CREATE INDEX IDX_Answers_FieldID ON Answers (field_id);

CREATE TABLE Field_options(
                              id INT IDENTITY(1,1) PRIMARY KEY,
                              field_id INT NOT NULL,
                              response NVARCHAR(255) NOT NULL,
                              CONSTRAINT FK_AnswersOptions_Answer FOREIGN KEY (field_id) REFERENCES Fields (id) ON DELETE CASCADE
);
CREATE INDEX IDX_FieldOptions_FieldID ON Field_options (field_id);
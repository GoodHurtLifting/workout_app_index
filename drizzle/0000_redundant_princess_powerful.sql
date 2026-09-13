CREATE TABLE `app_features` (
	`app_id` text NOT NULL,
	`feature_id` text NOT NULL,
	`availability` text DEFAULT 'unknown' NOT NULL,
	`access_level` text DEFAULT 'unknown' NOT NULL,
	`platform_note` text,
	`qualification_note` text,
	`verified_at` integer,
	PRIMARY KEY(`app_id`, `feature_id`),
	FOREIGN KEY (`app_id`) REFERENCES `catalog_apps`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`feature_id`) REFERENCES `features`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `catalog_apps` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`developer` text,
	`short_description` text NOT NULL,
	`product_type` text NOT NULL,
	`publication_status` text DEFAULT 'candidate' NOT NULL,
	`ai_status` text DEFAULT 'unknown' NOT NULL,
	`affiliation_disclosure` text,
	`date_last_researched` integer,
	`date_last_evaluated` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `catalog_apps_slug_unique` ON `catalog_apps` (`slug`);--> statement-breakpoint
CREATE TABLE `catalog_publications` (
	`id` text PRIMARY KEY NOT NULL,
	`catalog_version` text NOT NULL,
	`fit_methodology_version` text NOT NULL,
	`legit_methodology_version` text NOT NULL,
	`snapshot_json` text NOT NULL,
	`published_by` text NOT NULL,
	`published_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `catalog_publications_catalog_version_unique` ON `catalog_publications` (`catalog_version`);--> statement-breakpoint
CREATE TABLE `evaluations` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`methodology_version` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`legit_score` integer,
	`confidence` text DEFAULT 'limited' NOT NULL,
	`notes` text,
	`evaluated_at` integer,
	FOREIGN KEY (`app_id`) REFERENCES `catalog_apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `evidence_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`app_id` text NOT NULL,
	`source_type` text NOT NULL,
	`url` text NOT NULL,
	`claim_supported` text NOT NULL,
	`checked_at` integer NOT NULL,
	`public` integer DEFAULT false NOT NULL,
	`internal_note` text,
	FOREIGN KEY (`app_id`) REFERENCES `catalog_apps`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `features` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`group_name` text NOT NULL,
	`public_label` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `features_slug_unique` ON `features` (`slug`);
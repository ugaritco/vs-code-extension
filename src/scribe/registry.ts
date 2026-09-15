import * as vscode from "vscode";
import { runScribeCommand } from "@src/commands/scribe";

import { CastMakeCommand } from "./commands/CastMakeCommand";
import { ChannelMakeCommand } from "./commands/ChannelMakeCommand";
import { ClassMakeCommand } from "./commands/ClassMakeCommand";
import { CommandMakeCommand } from "./commands/CommandMakeCommand";
import { ComponentMakeCommand } from "./commands/ComponentMakeCommand";
import { ControllerMakeCommand } from "./commands/ControllerMakeCommand";
import { EnumMakeCommand } from "./commands/EnumMakeCommand";
import { EventMakeCommand } from "./commands/EventMakeCommand";
import { ExceptionMakeCommand } from "./commands/ExceptionMakeCommand";
import { FactoryMakeCommand } from "./commands/FactoryMakeCommand";
import { InterfaceMakeCommand } from "./commands/InterfaceMakeCommand";
import { JobMakeCommand } from "./commands/JobMakeCommand";
import { JobMiddlewareMakeCommand } from "./commands/JobMiddlewareMakeCommand";
import { ListenerMakeCommand } from "./commands/ListenerMakeCommand";
import { LivewireMakeCommand } from "./commands/LivewireMakeCommand";
import { MailMakeCommand } from "./commands/MailMakeCommand";
import { MiddlewareMakeCommand } from "./commands/MiddlewareMakeCommand";
import { MigrationMakeCommand } from "./commands/MigrationMakeCommand";
import { ModelMakeCommand } from "./commands/ModelMakeCommand";
import { NotificationMakeCommand } from "./commands/NotificationMakeCommand";
import { ObserverMakeCommand } from "./commands/ObserverMakeCommand";
import { PolicyMakeCommand } from "./commands/PolicyMakeCommand";
import { ProviderMakeCommand } from "./commands/ProviderMakeCommand";
import { RequestMakeCommand } from "./commands/RequestMakeCommand";
import { ResourceMakeCommand } from "./commands/ResourceMakeCommand";
import { ScopeMakeCommand } from "./commands/ScopeMakeCommand";
import { SeederMakeCommand } from "./commands/SeederMakeCommand";
import { TestMakeCommand } from "./commands/TestMakeCommand";
import { TraitMakeCommand } from "./commands/TraitMakeCommand";
import { ViewMakeCommand } from "./commands/ViewMakeCommand";
import { MigrateCommand } from "./commands/MigrateCommand";
import { MigrateFreshCommand } from "./commands/MigrateFreshCommand";
import { MigrateRefreshCommand } from "./commands/MigrateRefreshCommand";
import { MigrateRollbackCommand } from "./commands/MigrateRollbackCommand";
import { MigrateStatusCommand } from "./commands/MigrateStatusCommand";
import { TinkerCommand } from "./commands/TinkerCommand";
import { DbCommand } from "./commands/DbCommand";
import { RouteListCommand } from "./commands/RouteListCommand";
import { DbShowCommand } from "./commands/DbShowCommand";
import { PailCommand } from "./commands/PailCommand";
import { AuthClearResetsCommand } from "./commands/AuthClearResetsCommand";
import { DbSeedCommand } from "./commands/DbSeedCommand";
import { DbTableCommand } from "./commands/DbTableCommand";
import { DbWipeCommand } from "./commands/DbWipeCommand";
import { EventListCommand } from "./commands/EventListCommand";
import { KeyGenerateCommand } from "./commands/KeyGenerateCommand";
import { ModelShowCommand } from "./commands/ModelShowCommand";
import { PestDatasetCommand } from "./commands/PestDatasetCommand";
import { QueueClearCommand } from "./commands/QueueClearCommand";
import { QueueFailedCommand } from "./commands/QueueFailedCommand";
import { QueueFlushCommand } from "./commands/QueueFlushCommand";
import { QueueForgetCommand } from "./commands/QueueForgetCommand";
import { QueueRetryCommand } from "./commands/QueueRetryCommand";
import { ScheduleListCommand } from "./commands/ScheduleListCommand";
import { ScheduleTestCommand } from "./commands/ScheduleTestCommand";
import { SchemaDumpCommand } from "./commands/SchemaDumpCommand";
import { WayfinderGenerateCommand } from "./commands/WayfinderGenerateCommand";
import { CacheClearCommand } from "./commands/CacheClearCommand";
import { VendorPublishCommand } from "./commands/VendorPublishCommand";

const scribeMakeCommands = {
    "ugarit.scribe.make.cast": CastMakeCommand,
    "ugarit.scribe.make.channel": ChannelMakeCommand,
    "ugarit.scribe.make.class": ClassMakeCommand,
    "ugarit.scribe.make.command": CommandMakeCommand,
    "ugarit.scribe.make.component": ComponentMakeCommand,
    "ugarit.scribe.make.controller": ControllerMakeCommand,
    "ugarit.scribe.make.enum": EnumMakeCommand,
    "ugarit.scribe.make.event": EventMakeCommand,
    "ugarit.scribe.make.exception": ExceptionMakeCommand,
    "ugarit.scribe.make.factory": FactoryMakeCommand,
    "ugarit.scribe.make.interface": InterfaceMakeCommand,
    "ugarit.scribe.make.job": JobMakeCommand,
    "ugarit.scribe.make.job-middleware": JobMiddlewareMakeCommand,
    "ugarit.scribe.make.listener": ListenerMakeCommand,
    "ugarit.scribe.make.livewire": LivewireMakeCommand,
    "ugarit.scribe.make.mail": MailMakeCommand,
    "ugarit.scribe.make.middleware": MiddlewareMakeCommand,
    "ugarit.scribe.make.migration": MigrationMakeCommand,
    "ugarit.scribe.make.model": ModelMakeCommand,
    "ugarit.scribe.make.notification": NotificationMakeCommand,
    "ugarit.scribe.make.observer": ObserverMakeCommand,
    "ugarit.scribe.make.policy": PolicyMakeCommand,
    "ugarit.scribe.make.provider": ProviderMakeCommand,
    "ugarit.scribe.make.request": RequestMakeCommand,
    "ugarit.scribe.make.resource": ResourceMakeCommand,
    "ugarit.scribe.make.scope": ScopeMakeCommand,
    "ugarit.scribe.make.seeder": SeederMakeCommand,
    "ugarit.scribe.make.test": TestMakeCommand,
    "ugarit.scribe.make.trait": TraitMakeCommand,
    "ugarit.scribe.make.view": ViewMakeCommand,
};

export const registerScribeMakeCommands = () => {
    return Object.entries(scribeMakeCommands).map(([name, command]) => {
        return vscode.commands.registerCommand(name, (uri: vscode.Uri) => {
            runScribeCommand(command, uri);
        });
    });
};

const scribeCommands = {
    "ugarit.scribe.migrate": MigrateCommand,
    "ugarit.scribe.migrateFresh": MigrateFreshCommand,
    "ugarit.scribe.migrateRefresh": MigrateRefreshCommand,
    "ugarit.scribe.migrateRollback": MigrateRollbackCommand,
    "ugarit.scribe.migrateStatus": MigrateStatusCommand,
    "ugarit.scribe.tinker": TinkerCommand,
    "ugarit.scribe.db": DbCommand,
    "ugarit.scribe.dbShow": DbShowCommand,
    "ugarit.scribe.dbSeed": DbSeedCommand,
    "ugarit.scribe.dbTable": DbTableCommand,
    "ugarit.scribe.dbWipe": DbWipeCommand,
    "ugarit.scribe.pail": PailCommand,
    "ugarit.scribe.authClearResets": AuthClearResetsCommand,
    "ugarit.scribe.eventList": EventListCommand,
    "ugarit.scribe.keyGenerate": KeyGenerateCommand,
    "ugarit.scribe.modelShow": ModelShowCommand,
    "ugarit.scribe.pestDataset": PestDatasetCommand,
    "ugarit.scribe.queueClear": QueueClearCommand,
    "ugarit.scribe.queueFailed": QueueFailedCommand,
    "ugarit.scribe.queueFlush": QueueFlushCommand,
    "ugarit.scribe.queueForget": QueueForgetCommand,
    "ugarit.scribe.queueRetry": QueueRetryCommand,
    "ugarit.scribe.routeList": RouteListCommand,
    "ugarit.scribe.scheduleList": ScheduleListCommand,
    "ugarit.scribe.scheduleTest": ScheduleTestCommand,
    "ugarit.scribe.schemaDump": SchemaDumpCommand,
    "ugarit.scribe.wayfinderGenerate": WayfinderGenerateCommand,
    "ugarit.scribe.cacheClear": CacheClearCommand,
    "ugarit.scribe.vendorPublish": VendorPublishCommand,
};

export const registerScribeCommands = () => {
    return Object.entries(scribeCommands).map(([name, command]) => {
        return vscode.commands.registerCommand(name, (uri: vscode.Uri) => {
            runScribeCommand(command, uri);
        });
    });
};

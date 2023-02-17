import { Euler, Vector3 } from 'three';
import { ActionTree, createStore, MutationTree, Store } from 'vuex';

enum MutationTypes {
  UPDATE_CAMERA_POSITION = 'UPDATE_CAMERA_POSITION',
  UPDATE_CAMERA_ROTATION = 'UPDATE_CAMERA_ROTATION',
  LOADED = 'LOADED',
}

export enum ActionTypes {
  UPDATE_CAMERA_POSITION = 'UPDATE_CAMERA_POSITION',
  UPDATE_CAMERA_ROTATION = 'UPDATE_CAMERA_ROTATION',
  LOADED = 'LOADED',
}

export interface AppState {
  cameraPosition: Vector3;
  cameraRotation: Euler;
  loaded: boolean;
}

const state: AppState = {
  cameraPosition: new Vector3(0, 600, 1600),
  cameraRotation: new Euler(0, 0, 0),
  loaded: false,
};

const mutations: MutationTree<AppState> = {
  [MutationTypes.UPDATE_CAMERA_POSITION](
    state: AppState,
    payload: Vector3
  ): void {
    state.cameraPosition = payload;
  },

  [MutationTypes.UPDATE_CAMERA_ROTATION](
    state: AppState,
    payload: Euler
  ): void {
    state.cameraRotation = payload;
  },

  [MutationTypes.LOADED](state: AppState, payload: boolean): void {
    state.loaded = payload;
  },
};

const actions: ActionTree<AppState, AppState> = {
  [ActionTypes.UPDATE_CAMERA_POSITION]({ commit }, payload: Vector3) {
    commit(MutationTypes.UPDATE_CAMERA_POSITION, payload);
  },

  [ActionTypes.UPDATE_CAMERA_ROTATION]({ commit }, payload: Vector3) {
    commit(MutationTypes.UPDATE_CAMERA_ROTATION, payload);
  },

  [ActionTypes.LOADED]({ commit }, payload: boolean) {
    commit(MutationTypes.LOADED, payload);
  },
};

export const useStore = () => store as Store<AppState>;

export const store = createStore<AppState>({
  state,
  actions,
  mutations,
});
